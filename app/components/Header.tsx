import React from 'react'

export default function Header() {
  return (
<div className="navbar bg-black">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Pereira Solutions LLC Admin</a>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="">
        <UserButton />
        </div>
      </div>
    </div>
  </div>
</div>
  )
}
