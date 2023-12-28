module.exports = {
    // Indica onde procurar os testes
    testMatch: ['**/__tests__/**/*.test.jsx'],
    testEnvironment: 'jest-environment-jsdom',
    // Pasta para cobertura de código
    coverageDirectory: 'coverage',
  
    // Módulos que precisam ser transpilados antes de serem testados
    transform: {
      '^.+\\.js$': 'babel-jest',
      '^.+\\.jsx$': 'babel-jest',
      '^.+\\.scss$': 'jest-transform-stub', // Adicione esta linha para arquivos SCSS
    },
  
    // Outras configurações específicas conforme necessário
  };
  