import { useRoutes } from 'react-router-dom'
import CadastroColaborador from './cadastro-colaborador/cadastro-colaborador.component'

function CadastroRouter() {
  const element = useRoutes([
    {
      path: '/',
      children: [
        {
          path: 'cadastrocolaborador',
          element: <CadastroColaborador />,
        },
        // {
        //   path: '*',
        //   element: <Navigate to="/cadastro/cadastrocolaborador" replace />,
        // },
      ],
    },
  ])
  return element
}

export default CadastroRouter
