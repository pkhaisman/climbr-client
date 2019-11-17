import React from 'react';
import './Content.css';

class Content extends React.Component {
    render() {
        const contentData = [
            {
                title: 'To demo the app login with the following credentials',
                content: 'Username: `ashley@gmail.com`, Password: `11AAaa!!`',
            },
            {
                title: '1) Fill out your profile!',
                content: 'Add a picture, your name, and a short bio. Then, click `submit`!',
            },
            {
                title: '2) Swipe through users!',
                content: 'Swipe left if not interested in connecting, or swipe right if you are',
            },
            {
                title: '3) Check if you have any matches and chat with them!',
                content: 'If you have any matches, click to chat with them!',
            },
        ]
        const contentSections = contentData.map((section, index) => {
            return (
                <div className='Content__container__section' key={index}>
                    <h3 className='Content__container__section__title'>{section.title}</h3>
                    <div className='Content__container__section__content'>{section.content}</div>
                </div>
            );
        });

        return (
            <div className='Content'>
                <h2 className='Content__title'>Getting Started</h2>
                <div className='Content__container'>
                    {contentSections}
                </div>
            </div>
        );
    }
}

export default Content;