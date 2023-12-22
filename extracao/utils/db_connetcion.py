from utils import engine



# Testar a conexão
def criar_conexao():
    try:
        conn = engine.connect()
        print("Conexão bem-sucedida!")
    except Exception as e:
        print(f"Erro na conexão: {str(e)}")
