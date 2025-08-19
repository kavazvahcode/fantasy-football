import Image from 'next/image'

const NavBar = () => {
  return (
    <div className="w-full bg-pure-black ">
      <div className="flex items-center p-6 gap-6">
        <Image src="/football-icon.png" alt="Logo" width={48} height={41} />
        <h1 className="text-2xl">Fantasy Football</h1>
      </div>
    </div>
  )
}

export default NavBar
