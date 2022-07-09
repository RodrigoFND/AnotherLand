import { useRoutes } from 'react-router-dom'
import CadastroColaborador from './cadastro-colaborador.component'

function CadastroColaboradorRouter() {
  return useRoutes([
    {
      path: '/',
      children: [
        {
          path: 'cadastrocolaborador',
          element: <CadastroColaborador />,
        },
      ],
    },
  ])
}

export default CadastroColaboradorRouter
