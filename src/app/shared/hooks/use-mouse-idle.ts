import { useEffect, useState } from 'react'

function useMouseIdle() {
  const [isIdle, setIsIdle] = useState(false)
  const timeForIdle = 500 * 1000
  let time: NodeJS.Timeout = null

  useEffect(() => {
    resetTimer()
    document.onclick = resetTimer
    return () => {
      window.removeEventListener('click', resetTimer)
      clearTimeout(time)
    }
  }, [])

  function resetTimer() {
    setIsIdle(false)
    clearTimeout(time)
    time = setTimeout(() => {
      console.log('User Idle')
      setIsIdle(true)
    }, timeForIdle)
  }

  return isIdle
}

export default useMouseIdle
