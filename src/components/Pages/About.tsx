import { useEffect, useState } from "react";

export function About() {
  const [secondSection, setSecondSection] = useState<any>();

  function obsCallback() {
    console.log('observed');

    const oldPhoto = document.getElementById('old-photo');
    oldPhoto?.classList.toggle('hidden');

    const oldText = document.getElementById('old-text');

    oldText?.classList.toggle('faded-text');
  }

  const obsOptions = {
    root: null,
    threshold: 1
  }

  const observer = new IntersectionObserver(obsCallback, obsOptions);

  useEffect(() => {
    setSecondSection(document.querySelector('.about__text.second'));
    
    return () => {
      setSecondSection(undefined);
    }
  }, [])
  
  useEffect(() => {
    if(!secondSection) return;
    
    observer.observe(secondSection);

  }, [secondSection]);

  return (
    <>
      <div className="about-bg-photo">
        <img src="../../img/new-barn-photo.jpg" alt="barn photo" id="new-photo" className="about-bg-photo__img" />
        <img src="../../img/barn-photo.jpg" alt="barn photo" id="old-photo" className="about-bg-photo__img hidden" />
      </div>
      <main className="about">
        <h2 className="about__title page-title">About us</h2>

        <section id="old-text" className="about__text first faded-text">
          <h3 className="about__text--title">Since 1929</h3>

          <p className="about__text--description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima nam voluptate itaque aspernatur earum fugiat, tenetur consequatur fugit maiores repudiandae magni labore dolorem similique eos velit possimus, ad, dolore libero.
          </p>
        </section>

        <section className="about__text second">
          <h3 className="about__text--title">All the way till now.</h3>

          <p className="about__text--description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima nam voluptate itaque aspernatur earum fugiat, tenetur consequatur fugit maiores repudiandae magni labore dolorem similique eos velit possimus, ad, dolore libero.
          </p>
        </section>

      </main>
    </>
  )
}
