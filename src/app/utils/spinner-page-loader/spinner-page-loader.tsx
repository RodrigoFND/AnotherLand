import './spinner-page-loader.scss'
import { PuffLoader } from 'react-spinners'
import { useAppSelector } from '../../store/hooks'

const SpinnerPageLoader = () => {
  const isSpinnerRequested = useAppSelector(
    (state) => state.spinnerPageLoader.isSpinning
  )

  const loadingSpinner = (
    <div className="block-page d-flex align-items-center justify-content-center">
      <PuffLoader
        loading={true}
        color={'rgba(165, 7, 42)'}
        size={90}
      ></PuffLoader>
    </div>
  )

  return isSpinnerRequested ? loadingSpinner : <></>
}

export default SpinnerPageLoader
