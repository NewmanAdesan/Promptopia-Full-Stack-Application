import Feed from '@components/Feed.jsx';

const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discover & Share
                <br className="max-md:hidden"/>
                <span className="orange_gradient text-center"> AI-Powered Prompts</span>
            </h1>
            <p className="desc text-center">
                Promptopia is an open-source AI prompting tool for modern world to discover, create & share creative prompts
            </p>

            <Feed />
        </section>
    );
}

/**
 * head_text: 
 *      specifies a font-size, line-height, font-weight, margin-top, 
 *      responsive font-size & text-color for text we would regard as headings
 * 
 * 
 * flex_center:
 *      a flexbox whose item is centered vertically & horizontalling.
 * 
 * 
 * 
 * desc:
 *      specifies text-color, responsive font-size, maximum width & margin-top
 *      for text we regard to as descriptions.
 */

export default Home;