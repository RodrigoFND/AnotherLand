import { IconType } from 'react-icons'
import { BsFillPeopleFill } from 'react-icons/bs'

export type MenuType = {
  [index: string]: {
    path: string
    text: string
    icon: any
  }
}

export const Menu: MenuType = {
  register: {
    path: 'register',
    text: 'Register',
    icon: (props?: IconType) => {
      return <BsFillPeopleFill {...props} />
    },
  },
}

export type MenuTreeType = {
  path: string
  description: string
  isTree: boolean
  children?: MenuTreeType[]
  icon?: any
}

export const MenuTree: MenuTreeType[] = [
  {
    path: '/register',
    description: 'Register',
    isTree: true,
    children: [
      {
        description: 'Register employee',
        path: '/registeremployee',
        isTree: false,
      },
      {
        description: 'Register role permission',
        path: '/registerrolepermission',
        isTree: false,
      },
      {
        description: 'Register Multiple Task Test',
        path: '/registermultipletest',
        isTree: true,
        children: [
          {
            description: 'Test 1',
            path: '/test1',
            isTree: false,
          },
        ],
      },
    ],
  },
]
