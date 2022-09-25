import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../Api'
import { Album } from '../../types/Album'
import './styles.css'

export const Home = () => {

  useEffect(()=>{
    loadAlbums()
  },[])

  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(false)

  const loadAlbums = async () => {
    setLoading(true)
    let json = await api.getAllAlbums()
    setAlbums(json)
    setLoading(false)
  }

  return (
    <>
      {loading &&
        <div className='loading'>
          Carregando...
        </div>
      } 
      {!loading && albums.length > 0 && 
        <div>
          {albums.map((item, index)=>(
            <Link to={`/album/${item.id}`}  className='links'>
            <div className='box' key={index}>
              <span>{item.id}# - {item.title}</span>
            </div>
            </Link>
          ))}
        </div>
      }
    </>

  )
}