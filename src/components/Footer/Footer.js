import React from 'react';
import "./footer.css";
function Footer() {
    const date = new Date();
    return (
        <div>
            <div>
                <footer className="pt-md-5">
                    <div className="text-center p-4">
                        <b>© {date.getFullYear()} Copyright:DQuiz.com - Created By Dhannveen Uppal</b>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Footer