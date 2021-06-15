import React,{Component} from 'react';

class MovieReviewSection extends Component {

    render () {
        const review = this.props.review;

        return (
            <React.Fragment>
                <div className="review-section">
                    <div className="user-detail">
                        <div className="review-author-header">
                            {review.user.username}
                        </div>
                    </div>
                    <div className="comment-detail">
                        {review.comment}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default MovieReviewSection;