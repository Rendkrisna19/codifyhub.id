import Swal from 'sweetalert2'

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export const confirmDelete = async (title: string = 'Hapus data ini?') => {
  const result = await Swal.fire({
    title,
    text: "Tindakan ini tidak bisa dibatalkan!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#EF4444',
    cancelButtonColor: '#9CA3AF',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  })
  return result.isConfirmed
}
