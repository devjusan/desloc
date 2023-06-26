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
  VEHICLE: {
    DIALOG: {
      EDIT: {
        TITLE: (name: string) => `Veículo ${name}`,
        SUBTITLE: 'Edite as informações do veículo',
      },
      CREATE: {
        TITLE: 'Novo veículo',
        SUBTITLE: 'Informe os dados do veículo',
      },
      DELETE: {
        TITLE: (name: string) => `Excluir veículo ${name}`,
        SUBTITLE: 'Tem certeza que deseja excluir este veículo?',
      },
    },
  },
  DISPLACEMENT: {
    DIALOG: {
      EDIT: {
        TITLE: (name: string) => `Deslocamento ${name}`,
        SUBTITLE: 'Edite as informações do deslocamento',
      },
      CREATE: {
        TITLE: 'Novo deslocamento',
        SUBTITLE: 'Informe os dados do deslocamento',
      },
      DELETE: {
        TITLE: (name: string) => `Excluir deslocamento ${name}`,
        SUBTITLE: 'Tem certeza que deseja excluir este deslocamento?',
      },
    },
  },
  GENERIC: {
    DIALOG: {
      EDIT: {
        TITLE: (name: string) => `Editar ${name}`,
        SUBTITLE: 'Edite as informações',
      },
      CREATE: {
        TITLE: 'Novo',
        SUBTITLE: 'Informe os dados',
      },
      DELETE: {
        TITLE: (name: string) => `Excluir ${name}`,
        SUBTITLE: 'Tem certeza que deseja excluir este item?',
      },
    },
  },
};
