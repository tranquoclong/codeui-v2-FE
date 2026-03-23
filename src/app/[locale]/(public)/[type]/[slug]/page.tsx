import ElementNav from '../element-nav'
import ElementCode from './elementCode'

export default async function ElementDetailPage(props: {
  params: Promise<{
    slug: number
  }>
}) {
  const params = await props.params

  const { slug } = params
  return (
    <div className="px-5 py-0 data-[path='/']:px-0 root-container relative flex mb-12">
      <ElementNav />
      <ElementCode id={slug} />
    </div>
  )
}
