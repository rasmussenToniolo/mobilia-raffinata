import { useEffect, useState } from "react";

export function Home(props: {setSelectedNavEl: (el: string) => void}) {
  // Various videos in backgrund
  const [curVideo, setCurVideo] = useState<number>(1);

  return (
    <>
    <div className="home-background">
      <video className="home-background__content" autoPlay muted loop>
        <source src={`../../img/bg-video-${curVideo}.mp4`} type="video/mp4" />
        Browser not supported for video background.
      </video>
    </div>
    <main className="home">
      <div className="section-wrap first">
        <section className="home__text first">
          <h3 className="home__text--title">Specially made for you.</h3>

          <p className="home__text--description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus exercitationem quam, provident perferendis accusamus, qui facilis ullam suscipit optio modi ratione eaque consequuntur explicabo! Doloribus magni suscipit quia vel quod!</p>

          <button onClick={() => props.setSelectedNavEl('about')} className="home__text--link">Learn more about us &rarr;</button>
        </section>
      </div>

      <div className="section-wrap second">
        <section className="home__text second">
          <h3 className="home__text--title">With all the care and attention you need.</h3>

          <p className="home__text--description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus exercitationem quam, provident perferendis accusamus, qui facilis ullam suscipit optio modi ratione eaque consequuntur explicabo! Doloribus magni suscipit quia vel quod!</p>
          
          <button onClick={() => props.setSelectedNavEl('products')} className="home__text--link">See our furniture &rarr;</button>
        </section>
      </div>
      
      <div className="section-wrap third">
        <section className="home__text third">
          <h3 className="home__text--title">Want to hear more about us?</h3>
          {/* <p className="home__text--description">Sign up to our emailing list or contact us!</p> */}

          <button onClick={() => props.setSelectedNavEl('contact')} className="home__text--link">Contact us &rarr;</button>
        </section>
      </div>
    </main>
    </>
  )
}
