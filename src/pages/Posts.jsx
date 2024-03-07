import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { useSelector } from "react-redux"
import { getPosts } from "../services/operations/postApi"
import Tilt from 'react-parallax-tilt'
import formatDate from '../utils/formatDate'

const Posts = () => {

  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState(null)
  const {token} = useSelector((state) => state.auth)

  //for previous and next page buttons
  const [page, setPage] = useState(1)
  const [prevPage, setPrevPage] = useState(false)
  const [nextPage, setNextPage] = useState(false)

  const LIMIT = 10

  useEffect(()=>{   //fetch posts upon component mounting
    setLoading(true)
    ;(async()=>{            
      setPrevPage(false)
      setNextPage(false)                  
      const results = await getPosts(token, page, LIMIT)
      setPosts(results.results)
      if(results.next) setNextPage(true)
      if(results.previous) setPrevPage(true)
    })()
    setLoading(false)
  },[token, page])

  if(loading) return <div className="flex justify-center items-center w-full h-screen"><div className="spinner"></div></div>

  return (
    <div>
      <Navbar/>
      <div className="overflow-auto w-full h-[calc(100vh-9rem)] relative">

      {/* prev and next buttons */}
      <div className="flex gap-2 fixed bottom-2 right-[30%] sm:right-[47%] z-10">
        {<button onClick={()=>setPage(page-1)} disabled={!prevPage}
        className={`text-white text-lg font-semibold rounded-md p-2 ${prevPage ? "bg-blue-500" : "bg-gray-500 cursor-not-allowed"}`}
        >Previous</button>}
        {<button disabled={!nextPage}
        className={`text-white text-lg font-semibold rounded-md p-2 ${nextPage ? "bg-blue-500" : "bg-gray-500 cursor-not-allowed"}`}
         onClick={()=>setPage(page+1)}>Next</button>}
      </div>   

        {posts?.length === 0 && <div className="grid place-items-center mt-40 font-semibold text-3xl">Error in fetching posts☹️</div>}

        {
          posts?.map((post)=>(
            <div key={post.id} className="bg-gray-100 px-2 py-1">
              <article className="mx-auto my-8 flex max-w-md flex-col rounded-2xl bg-white px-4 shadow md:max-w-5xl md:flex-row md:items-center drop-shadow-[5px_5px_rgba(0,0,0,0.25)] hover:drop-shadow-[3px_3px_rgba(0,0,0,0.25)] transition-all duration-200">
                <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} perspective={1000} scale={1} 
                className="shrink-0 my-4 md:mr-8 md:max-w-sm border border-black rounded-2xl">
                  <img className="rounded-2xl" src={post.photo_url} alt="post_photo" />
                </Tilt>
                <div className="py-4 sm:py-8">
                  <p className="block text-2xl font-medium text-gray-700 cursor-pointer">{post.title}</p>
                  <p className="mb-4">{post.description}</p>
                  <p className="mb-6 text-gray-500">{post.content_text.split(" ").length > 50
                                        ? post.content_text
                                            .split(" ")
                                            .slice(0, 50)
                                            .join(" ") + "..."
                                        : post.content_text}</p>
                  <div className="flex items-center">
                    <div>
                      <p className="font-medium text-gray-700 capitalize">#{post.category}</p>
                      <p className="text-sm text-gray-600">{formatDate(post.created_at)}</p>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Posts