import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../Api'
import './styles.css'

export const Photos = () => {
  useEffect(()=>{
    loadPhoto()
  }, [])

  const params = useParams()
  const navigate = useNavigate()

  const [photo, setPhoto] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const loadPhoto = async () => {
    setLoading(true)
    let json = await api.getPhoto(params.id || '')
    setPhoto(json)
    setLoading(false)
  }

  const handleBackButton = () => {
    navigate(-1)
  }

  return (
    <>
      {loading && 
        <div className="loading">
          Carregando...
        </div>
      }

      {!loading &&
        <div>
          <button onClick={handleBackButton}>Voltar</button>
          <h3 className='photo-title'>Titulo: {photo.title}</h3>
          <div className='photo-url'>
            <img src={photo.url} alt="" />
          </div>
        </div> 
      }
    </>
  ) 
}