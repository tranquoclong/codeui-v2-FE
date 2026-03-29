export const queryKeys = {
  accountMe: {
    all: ['account-me'] as const
  },
  accounts: {
    all: ['accounts'] as const,
    detail: (id: number) => ['accounts', id] as const
  },
  profiles: {
    all: ['profiles'] as const,
    detail: (id: number) => ['profiles', id] as const
  },
  guests: {
    all: ['guests'] as const,
    list: (queryParams: unknown) => ['guests', queryParams] as const
  },
  guestOrders: {
    all: ['guest-orders'] as const
  },
  dishes: {
    all: ['dishes'] as const,
    detail: (id: number) => ['dishes', id] as const
  },
  comments: {
    all: ['comments'] as const,
    lists: (elementId: number, { limit }: { limit: number }) => ['comments', 'lists', elementId, { limit }] as const,
    replies: (commentId: number, { limit }: { limit: number }) => ['comments', 'replies', commentId, { limit }] as const,
    detail: (id: number) => ['comments', 'detail', id] as const,
  },
  elements: {
    all: ['elements'] as const,
    allManage: ['manageElements'] as const, 
    list: (queryParams: unknown) => ['elements', queryParams] as const,
    listManage: (queryParams: unknown) => ['manageElements', queryParams] as const,
    detail: (id: number) => ['elements', id] as const,
    detailManage: (id: number) => ['manageElements', id] as const,
    code: (id: number) => ['code', id] as const
  },
  orders: {
    list: (queryParams: unknown) => ['orders', queryParams] as const,
    detail: (id: number) => ['orders', id] as const
  },
  tables: {
    all: ['tables'] as const,
    detail: (id: number) => ['tables', id] as const
  },
  dashboardIndicators: {
    list: (queryParams: unknown) => ['dashboardIndicators', queryParams] as const
  }
} as const

