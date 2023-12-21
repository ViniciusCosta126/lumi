import pdfplumber as p2
from pathlib import Path
import re
import os





def encontrar_palavra(palavras_desejadas, palavras):
    try:
        index_inicio = [c['text']
                        for c in palavras].index(palavras_desejadas[0])
        while True:
            if [c['text'] for c in palavras[index_inicio:index_inicio + len(palavras_desejadas)]] == palavras_desejadas:
                index_final = index_inicio + len(palavras_desejadas) - 1
                break
            index_inicio = [c['text'] for c in palavras].index(
                palavras_desejadas[0], index_inicio + 1)
        if ('Contrib' in palavras_desejadas and 'Ilum' in palavras_desejadas):
            encontradas = palavras[index_final+1]['text']
            return encontradas
        encontradas = [palavras[index_final+1]['text'], palavras[index_final+2]
                       ['text'], palavras[index_final+3]['text'], palavras[index_final+4]['text']]
        return encontradas
    except ValueError:
        print("Sequência não encontrada")

def extrair_dados():
    diretorio = input("Digite o diretorio onde estão as faturas =>")
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

            dados = {
                'scee':{
                    'kWh':int(scee[1].replace('.','')),
                    'valor Total':float(scee[1].replace(',','.'))
                },
                'gdi':{
                    'kWh':int(gdi[1].replace('.','')),
                    'valor Total':float(gdi[1].replace(',','.'))
                },
                'contrib':float(contrib.replace(',','.')),
                'energe':{
                    'kWh':float(energe[1].replace('.','')),
                    'valor Total':float(energe[1].replace(',','.'))
                },
                'nota':nota,
                'numero_cliente':numero_cliente
            }
            print(dados)
            pdf.close()
