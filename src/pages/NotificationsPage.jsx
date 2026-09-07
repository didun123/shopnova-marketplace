import { useStore } from '../context/StoreContext'

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useStore()

  return (
    <div className="container-x py-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <button className="btn btn-ghost" onClick={markAllNotificationsRead}>Mark all as read</button>
      </div>
      <div className="space-y-2">
        {notifications.map((note) => (
          <article key={note.id} className={`card p-4 ${note.read ? '' : 'border-brand'}`}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold">{note.title}</p>
                <p className="text-sm text-muted">{note.text}</p>
                <p className="text-xs text-muted mt-1">{new Date(note.date).toLocaleString('en-IN')}</p>
              </div>
              {!note.read && <button className="text-sm text-brand" onClick={() => markNotificationRead(note.id)}>Mark read</button>}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
