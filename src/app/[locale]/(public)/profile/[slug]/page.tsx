import ElementNav from "../../[type]/element-nav";
import Profile from "./profile";

export default async function ProfilePage(
  props: {
    params: Promise<{
      slug: number
    }>
  }
) {
  const params = await props.params;

  const {
    slug
  } = params;
  return (
    <div className="px-5 py-0 data-[path='/']:px-0 root-container relative flex mb-12 border-b-2 border-dark-300 shadow-[rgba(0,_0,_0,_0.1)_0px_20px_25px_-5px,_rgba(0,_0,_0,_0.04)_0px_10px_10px_-5px]">
      <ElementNav />
      <Profile id={slug} />
    </div>
  )
}