<template>
    <div class="article-page">
        <div class="banner">
            <div class="container">
                <h1>{{ article.title }}</h1>
                <article-meta :article="article" />
            </div>
        </div>

        <div class="container page">
            <div class="row article-content">
                <div class="col-md-12" v-html="article.body"></div>
            </div>

            <hr />

            <div class="article-actions">
                <article-meta :article="article" />
            </div>

            <article-comments :article="article" />
            
        </div>
    </div>
</template>

<script>
import { getArticle } from '@/api/article';
import markdownIt from 'markdown-it';
import articleMeta from './components/article-meta.vue';
import articleComments from './components/article-comments.vue';
export default {
    components: { articleMeta, articleComments },
    name: "articleIndex",
    async asyncData({ params }) {
        const { data } = await getArticle(params.slug);
        const { article } = data;
        article.body =  new markdownIt().render(article.body);
        return {
            article
        }
    },
    head() {
        return {
            title: `${this.article.title} - RealWorld`,
            meta: [
                {hid: 'article', name: 'article', content: this.article.description}
            ]
        }
    }
};
</script>

<style>
</style>