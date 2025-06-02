'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { url } from '../../utils/api';
import axios from 'axios';
import useSWR from 'swr';
import { fetcher } from '@/utils/Fetcher';

// Create a Context for the blogs
const BlogsContext = createContext();

// Create a provider component
export const BlogsProvider = ({ children }) => {
    const [activeCategory, setActiveCategory] = useState(0);

    const [blogs, setBlogs] = useState([]);

    const customCategory = {
        _id: null,
        name: "All Blogs",
        slug: "all-blogs",
        description: "This category contains all blog posts.",
        status: "active",
        parentCategory: null,
        metaKeywords: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0
    };

    const [blogCategories, setBlogCategories] = useState([])

    const blogCategoryApi = `${url}/api/v1/blog-categories/get`;
    const [blogCategoryCount, setBlogCategoryCount] = useState(0);

    const {data: blogCategoryData, error: blogCategoryError, isLoading: blogCategoryLoading} = useSWR(blogCategoryApi, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 1000 * 60 * 60 * 24 * 365
    })

    if(blogCategoryError && blogCategoryCount < 3) {
        setTimeout(() => {
            setBlogCategoryCount(blogCategoryCount + 1);
        }, 1000)
    }

    useEffect(() => {
        if(blogCategoryData) {
            setBlogCategories([customCategory, ...blogCategoryData.categories]);
        }
    }, [blogCategoryData])




    // const fetchBlogCategories = async () => {
    //     const api = `/api/v1/blog-categories/get`;
    //     try {
    //         if (!Array.isArray(blogCategories) || !blogCategories.length) {
    //             const response = await axios.get(`${url}${api}`);
    //             if (response.status === 200) {
    //                 setBlogCategories([customCategory, ...response.data.categories]);
    //             } else {
    //                 console.error("UnExpected Error", response.status)
    //             }
    //         }
    //     } catch (error) {
    //         console.error("Unexpected Server Error:", error.response || error.message || error);
    //         throw new Error("UnExpected Server Error");
    //     }
    // }

    const [categoryId, setCategoryId] = useState(null);

    const blogsApi = categoryId === null ? `${url}/api/v1/blogs/get` : `${url}/api/v1/blogs/get?caegory=${categoryId}`;
    const [blogsCount, setBlogsCount] = useState(0);
    const {data: blogsData, error: blogsError, isLoading: blogsLoading} = useSWR(blogsApi, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 1000 * 60 * 60 * 24 * 365
    })

    if(blogsError && blogsCount < 3) {
        setTimeout(() => {
            setBlogsCount(blogsCount + 1);
        }, 1000)
    }

    useEffect(() => {
        if(blogsData) {
            setBlogs(blogsData.blogs);
        }
    }, [blogsData])

    // const fetchBlogs = async (categoryId) => {
    //     const api = `/api/v1/blogs/get`;
    //     try {
    //         let response
    //         if (categoryId === null) {
    //             response = await axios.get(`${url}${api}`);
    //             if (response.status === 200 && response.data.blogs) {
    //                 setBlogs(response.data.blogs);
    //             } else {
    //                 console.error("UnExpected Error", response.status);
    //             }
    //         } else {
    //             response = await axios.get(`${url}${api}?category=${categoryId}`);
    //             setBlogs(response.data.blogs);
    //         }
    //     } catch (error) {
    //         console.error("UnExpected Server Error", error);
    //     }
    // }

    // useEffect(() => {
    //     fetchBlogCategories()
    //     fetchBlogs(null)
    // }, [])

    return (
        <BlogsContext.Provider value={{
            blogs,
            setBlogs,
            // fetchBlogCategories,
            blogCategories,
            setBlogCategories,
            // fetchBlogs,
            activeCategory,
            setActiveCategory,
        }}>
            {children}
        </BlogsContext.Provider>
    );
};

export const useBlog = () => useContext(BlogsContext);