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
};
