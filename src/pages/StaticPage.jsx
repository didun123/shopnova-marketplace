export default function StaticPage({ title, description }) {
  return (
    <div className="container-x py-10">
      <section className="card mx-auto max-w-3xl p-8">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="mt-3 text-muted">{description}</p>
      </section>
    </div>
  )
}
