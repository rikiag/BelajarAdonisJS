'use strict'

//Bring in Model
const Post = use('App/Models/Post')

//Bring in validator
const { validate } = use('Validator')

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

	async add({view}){
		return view.render('post.add')
	}

	async store({request, response, session}){
		//Validate input
		const validation = await validate(request.all(), {
			title: 'required|min:3|max:255',
			body: 'required|min:3'
		})

		if (validation.fails()) {
			session.withErrors(validation.messages()).flashAll()
			return response.redirect('back')
		}

		const post = new Post();

		post.title = request.input('title')
		post.body = request.input('body')

		await post.save()

		session.flash({ notification: 'Post Added!'})

		return response.redirect('/')
	}
}

module.exports = PostController
