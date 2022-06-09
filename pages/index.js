
import Dropzone from './components/Dropzone'
import Posts from './components/Posts'

export default function Home() {
  return (
    <div className="flex">
      <div className='p-5'>
      <Dropzone/>
      </div>
      <div className= "p-5 bg-gray-100 min-h-screen w-full">
        <Posts/>
    </div>
  </div>

  )
}
