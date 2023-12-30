import React from 'react';
import MetaData from '../layout/MetaData.jsx';
import Avatar from '../../assets/Avatar.png';

const AboutMe = () => {
  return (
      <section className="pt-10 overflow-hidden bg-gray-50 md:pt-0 sm:pt-16 2xl:pt-16">
          <MetaData title = "SwipeCart - About" /> 
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl min-h-[70vh] flex items-center py-10">
              <div className="grid items-center grid-cols-1 md:grid-cols-2">

                  <div>
                      <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Hey 👋 I am
                          <br className="block sm:hidden" /> Sumit Kevlani
                      </h2>
                      <p className="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">
                          I am a third year undergraduate student from NIT, Jalandhar pursuing B.tech in Information Technology.
                      </p>

                      <p className="mt-4 text-xl text-gray-600 md:mt-8">
                          <span className="relative inline-block">
                              <span className="absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300"></span>
                              <span className="relative"> Have a question? </span>
                          </span>
                          <br className="block sm:hidden" />Ask me on <a href="https://www.linkedin.com/in/sumit-kevlani-b61945224/" title=""
                              className="transition-all duration-200 text-sky-500 hover:text-sky-600 hover:underline">Linkedin</a>
                      </p>
                  </div>

                  <div className="relative pb-10">
                      <img className="absolute inset-x-0 bottom-0 -mb-48 -translate-x-1/2 left-1/2" src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/blob-shape.svg" alt="" />

                      <img className="relative w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110" src={Avatar} alt=""/>
                  </div>

              </div>
          </div>
      </section>
  )
}

export default AboutMe;
