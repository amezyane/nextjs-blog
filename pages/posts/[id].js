
import utilStyles from '../../styles/utils.module.css';
import Head from 'next/head';
import Layout from '../../components/layout';
import Date from '../../components/date';
import { getAllPostsIds, getPostData } from '../../lib/posts';

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <p className={utilStyles.lightText}><Date dateString={postData.date} /></p>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    );
}

// Récupérer tous les id des posts pour générer les paths (routes dynamiques)
export async function getStaticPaths() {
    const paths = getAllPostsIds();
    /*
        paths = [
            {
                params: {
                    id: fileName.replace(/\.md$/, ''),
                }
            },
            {
                params: {
                    id: fileName.replace(/\.md$/, ''),
                }
            },
        ]
    */
    return {
        paths, 
        fallback: false,
    };
}

// Récupérer les données pour le post à afficher selon l'id dans le path
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
        }
    };
}