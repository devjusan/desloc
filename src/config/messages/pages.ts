export const PAGE_MESSAGES = {
  CLIENT: {
    DIALOG: {
      EDIT: {
        TITLE: (name: string) => `Cliente ${name}`,
        SUBTITLE: 'Edite as informações do cliente',
      },
      CREATE: {
        TITLE: 'Novo cliente',
        SUBTITLE: 'Informe os dados do cliente',
      },
      DELETE: {
        TITLE: (name: string) => `Excluir cliente ${name}`,
        SUBTITLE: 'Tem certeza que deseja excluir este cliente?',
      },
    },
  },
  DRIVER: {
    DIALOG: {
      EDIT: {
        TITLE: (name: string) => `Condutor ${name}`,
        SUBTITLE: 'Edite as informações do condutor',
      },
      CREATE: {
        TITLE: 'Novo condutor',
        SUBTITLE: 'Informe os dados do condutor',
      },
      DELETE: {
        TITLE: (name: string) => `Excluir condutor ${name}`,
        SUBTITLE: 'Tem certeza que deseja excluir este condutor?',
      },
    },
  },
};
