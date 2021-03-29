<template>
    <div class="editor-page">
        <div class="container page">
            <div class="row">

                <div class="col-md-10 offset-md-1 col-xs-12">
                    <form @submit.prevent="submit">
                        <fieldset>
                            <fieldset class="form-group">
                                <input v-model="article.title" type="text" class="form-control form-control-lg" placeholder="Article Title">
                            </fieldset>
                            <fieldset class="form-group">
                                <input v-model="article.description" type="text" class="form-control" placeholder="What's this article about?">
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea v-model="article.body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input v-model="article.tags" type="text" class="form-control" placeholder="Enter tags"><div class="tag-list"></div>
                            </fieldset>
                            <button class="btn btn-lg pull-xs-right btn-primary">
                                Publish Article
                            </button>
                        </fieldset>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { getArticle, createArticle, updateArticle } from '@/api/article';
export default {
    name: 'editIndex',
    middleware: 'authenticated',
    async asyncData({query}) {
        const { slug } = query;
        let article = undefined;
        if (slug) {
            const { data } = await getArticle(slug);
            article = data.article;
        }
        return {
            article: article || {},
            slug
        }
    },
    methods: {
        async submit() {
            const { data } = await (this.slug ? updateArticle(this.article, this.slug) : createArticle(this.article));
            this.$router.push(`/article/${data.article.slug}`);
        }
    }
}
</script>

<style>

</style>