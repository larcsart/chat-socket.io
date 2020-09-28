export default function ({ store, redirect }) {
  if (
    ![null, undefined, ''].includes(store.state.user) &&
    !Object.keys(store.state.user).length
  ) {
    redirect('/?message=noUser')
  }
}
