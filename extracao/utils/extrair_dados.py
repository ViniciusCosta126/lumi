import pdfplumber as p2
import os
from .encontrar_palavra import encontrar_palavra
from model import Nota
from utils import session


def extrair_dados():
    diretorio = input("Digite o diretorio onde estão as faturas =>")
    notas = session.query(Nota).all()
    numeros = []
    if (len(notas) > 0):
        for c in notas:
            numeros.append(c.nota)

    for nome_arquivo in os.listdir(diretorio):
        if (os.path.isfile(os.path.join(diretorio, nome_arquivo))):
            novo_dir = os.path.join(diretorio, nome_arquivo)
            pdf = open(novo_dir, 'rb')
            pdf_reader = p2.open(pdf)
            page = pdf_reader.pages[0]

            palavras = page.extract_words()
            nota = []

            palavras_scee = ['Energia', 'SCEE', 's/', 'ICMS']
            palavras_gdi = ['Energia', 'compensada', 'GD', 'I']
            palavras_contrib = ['Contrib', 'Ilum', 'Publica', 'Municipal']
            palavras_energia = ["Energia", "Elétrica"]
            palavras_nota = ['NOTA', 'FISCAL', 'Nº']
            scee = encontrar_palavra(palavras_scee, palavras)
            gdi = encontrar_palavra(palavras_gdi, palavras)
            contrib = encontrar_palavra(palavras_contrib, palavras)
            energe = encontrar_palavra(palavras_energia, palavras)
            nota = encontrar_palavra(palavras_nota, palavras)[0]

            tables = page.extract_tables()
            numero_cliente = ''
            for row in tables:
                for rowseparada in row:
                    for c in rowseparada:
                        if (c != None):
                            if ('Nº DO CLIENTE' in c):
                                numero_cliente = c
                                numero_cliente = numero_cliente.split('\n')[1]
                            elif ('Referente a' in c):
                                mes = c
                                mes = mes.split('\n')[1].split(' ')[0]

            dados = {
                'scee': {
                    'kWh': int(scee[1].replace('.', '')),
                    'valor_total': float(scee[1].replace(',', '.'))
                },
                'gdi': {
                    'kWh': int(gdi[1].replace('.', '')),
                    'valor_total': float(gdi[1].replace(',', '.'))
                },
                'contrib': float(contrib.replace(',', '.')),
                'energe': {
                    'kWh': float(energe[1].replace('.', '')),
                    'valor_total': float(energe[1].replace(',', '.'))
                },
                'nota': nota,
                'numero_cliente': numero_cliente,
                'caminho': novo_dir,
                'mes': mes
            }

            nova_fatura = Nota(scee_kwh=dados['scee']['kWh'],
                               scee_valor_total=dados['scee']['valor_total'],
                               gdi_kwh=dados['gdi']['kWh'],
                               gdi_valor_total=dados['gdi']['valor_total'],
                               contrib_valor_total=dados['contrib'],
                               energia_kwh=dados['energe']['kWh'],
                               energia_valor_total=dados['energe']['valor_total'],
                               nota=dados['nota'],
                               numero_cliente=dados['numero_cliente'],
                               caminho=dados['caminho'],
                               mes=dados['mes']
                               )
            if (len(notas) > 0):
                if (nova_fatura.nota in numeros):
                    continue
                else:
                    session.add(nova_fatura)
                    session.commit()
            else:
                session.add(nova_fatura)
                session.commit()
            pdf.close()
    session.close()

    print("Faturas Adicionadas ao banco de dados!!")
