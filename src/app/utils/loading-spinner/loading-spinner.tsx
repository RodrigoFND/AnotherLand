import Spinner from 'react-bootstrap/esm/Spinner'
import './loading-spinner.scss'

const LoadingSpinner = () => {
  // const [isDataLoading, setDataLoading] = useState(true)

  const loadingSpinner = (
    <div className="block-page d-flex align-items-center justify-content-center">
      <Spinner animation="grow" role="status" className="spinner">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )

  return true ? loadingSpinner : <></>
}

export default LoadingSpinner
