import './loading-spinner.scss'

const LoadingSpinner = () => {
  // const [isDataLoading, setDataLoading] = useState(true)

  const loadingSpinner = <div className="block-page"></div>

  return true ? loadingSpinner : <></>
}

export default LoadingSpinner
