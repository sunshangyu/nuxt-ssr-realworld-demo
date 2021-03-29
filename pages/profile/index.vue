<template>
  <div class="profile-page">

    <div class="user-info">
        <div class="container">
        <div class="row">

            <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="image" class="user-img" />
            <h4>{{username}}</h4>
            <p>{{bio}}</p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
                <i class="ion-plus-round"></i>
                &nbsp;
                Follow {{username}}
            </button>
            </div>

        </div>
        </div>
    </div>

    <div class="container">
        <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
            <div class="articles-toggle">
                <ul class="nav nav-pills outline-active">
                    <li class="nav-item">
                        <span class="nav-link" :class="{active: tab === 'my_articles'}" to="" @click="tab = 'my_articles'">My Articles</span>
                    </li>
                    <li class="nav-item">
                        <span class="nav-link" :class="{active: tab === 'favorited_articles'}" to="" @click="tab = 'favorited_articles'">Favorited Articles</span>
                    </li>
                </ul>
            </div>

            <template v-if="tab === 'my_articles'">
                <div class="article-preview" v-for="article in yourArticles" :key="article.slug">
                    <div class="article-meta">
                        <nuxt-link :to="`/profile/${article.author.username}`"><img :src="article.author.image" /></nuxt-link>
                        <div class="info">
                            <nuxt-link :to="`/profile/${article.author.username}`" class="author">{{article.author.username}}</nuxt-link>
                            <span class="date">{{article.createdAt | date('MMM DD')}}</span>
                        </div>
                        <button class="btn btn-outline-primary btn-sm pull-xs-right">
                            <i class="ion-heart"></i> {{article.favoritesCount}}
                        </button>
                    </div>
                    <nuxt-link :to="`/article/${article.slug}`" class="preview-link">
                        <h1>{{article.description}}</h1>
                        <p>{{article.body}}</p>
                        <span>Read more...</span>
                    </nuxt-link>
                </div>
            </template>

            <template v-else>
                <div class="article-preview" v-for="article in favoritedArticles" :key="article.slug">
                    <div class="article-meta">
                        <nuxt-link :to="`/profile/${article.author.username}`"><img :src="article.author.image" /></nuxt-link>
                        <div class="info">
                            <nuxt-link :to="`/profile/${article.author.username}`" class="author">{{article.author.username}}</nuxt-link>
                            <span class="date">{{article.createdAt | date('MMM DD')}}</span>
                        </div>
                        <button class="btn btn-outline-primary btn-sm pull-xs-right">
                            <i class="ion-heart"></i> {{article.favoritesCount}}
                        </button>
                    </div>
                    <nuxt-link :to="`/article/${article.slug}`" class="preview-link">
                        <h1>{{article.description}}</h1>
                        <p>{{article.body}}</p>
                        <span>Read more...</span>
                    </nuxt-link>
                </div>
            </template>

        </div>

        </div>
    </div>

    </div>
</template>

<script>
import { getArticles } from '@/api/article';
import { getProfile } from '@/api/user';
export default {
    name: 'profileIndex',
    middleware: 'authenticated',
    async asyncData({ params }) {
        const { username } = params;
        const [ data1, data2, data3 ] = await Promise.all([getProfile(username), getArticles({ author: username }), getArticles({ favorited: username })]);
        const { bio, image, following } = data1.data.profile;
        const { articles: yourArticles } = data2.data;
        const { articles: favoritedArticles } = data3.data;
        return {
            username,
            bio,
            image,
            following,
            yourArticles,
            favoritedArticles,
            tab: 'my_articles'
        }
    }
}
</script>

<style>

</style>