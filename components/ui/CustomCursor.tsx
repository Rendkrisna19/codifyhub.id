'use client'

import { useEffect } from 'react'

export default function CustomCursor() {
  useEffect(() => {
    const dot = document.getElementById('cursor-dot')
    const outline = document.getElementById('cursor-outline')
    if (!dot || !outline) return

    // Aktifkan cursor mode: sembunyikan cursor default
    document.body.classList.add('custom-cursor-active')

    let mouseX = 0, mouseY = 0
    let outlineX = 0, outlineY = 0
    let rafId: number

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
    }

    const animateOutline = () => {
      outlineX += (mouseX - outlineX) * 0.12
      outlineY += (mouseY - outlineY) * 0.12
      outline.style.left = `${outlineX}px`
      outline.style.top = `${outlineY}px`
      rafId = requestAnimationFrame(animateOutline)
    }

    const handleEnter = () => {
      outline.style.width = '56px'
      outline.style.height = '56px'
      outline.style.borderColor = 'rgba(10,25,47,0.6)'
      outline.style.background = 'rgba(59,130,246,0.07)'
    }
    const handleLeave = () => {
      outline.style.width = '40px'
      outline.style.height = '40px'
      outline.style.borderColor = 'rgba(10,25,47,0.35)'
      outline.style.background = 'transparent'
    }

    document.addEventListener('mousemove', moveCursor)
    rafId = requestAnimationFrame(animateOutline)

    const interactives = document.querySelectorAll('a, button, [data-hover]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleEnter)
      el.addEventListener('mouseleave', handleLeave)
    })

    // Cleanup: restore cursor normal saat component unmount (pindah ke admin, dll)
    return () => {
      document.body.classList.remove('custom-cursor-active')
      document.removeEventListener('mousemove', moveCursor)
      cancelAnimationFrame(rafId)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [])

  return (
    <>
      <div id="cursor-dot" />
      <div id="cursor-outline" />
    </>
  )
}
