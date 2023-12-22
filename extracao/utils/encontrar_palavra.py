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
