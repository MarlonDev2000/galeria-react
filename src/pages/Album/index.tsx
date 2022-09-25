import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { api } from '../../Api'
import { Photos } from '../../types/Photos'
import './styles.css'

export const Album = () => {

  useEffect(()=>{
    loadAlbumInfo()
    loadPhotos()
  }, [])

  const params = useParams()
  const navigate = useNavigate()

  const [albumInfo, setAlbumInfo] = useState<any>({})
  const [photos, setPhotos] = useState<Photos[]>([])
  const [loading, setLoading] = useState(false)

  const loadAlbumInfo = async () => {
    setLoading(true)
    let json = await api.getAlbum(params.id || '')
    setAlbumInfo(json)
    setLoading(false)
  }

  const loadPhotos = async () => {
    let json = await api.getPhotos(params.id || '')
    setPhotos(json)
  }
  
  const handleBackButton = () => {
    navigate(-1)
  }

  return (
    <>
      {loading && 
        <div className='loading'>
          Carregando...
        </div>
      }

      {!loading && photos.length > 0 && 
        <div>
          <button onClick={handleBackButton}>Voltar</button>
          <h2>Título: {albumInfo.title}</h2>
          <div className='box-full'>
            {photos.map((item, index)=>(
              <div className='box-item' key={index}>
                <Link to={`/photos/${item.id}`}>
                  <div className='item'>
                    <img src={item.thumbnailUrl} alt="" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      }
    </>
  )
}