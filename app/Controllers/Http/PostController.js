'use strict'

//Bring in Model
const Post = use('App/Models/Post')

class PostController {
	async index({ view }){

		const posts = await Post.all()

		return view.render('home', {
			title: 'Home',
			posts: posts.toJSON()
		})
	}

	async details({ params, view }){

		const post = await Post.find(params.id)

		return view.render('post.details',{
			post: post
		})
	}
}

module.exports = PostController
