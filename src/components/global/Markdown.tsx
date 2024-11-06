'use client';

import { useEffect, useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';

interface MarkdownProps {
    filepath: string;
    className?: string;
}

const Markdown: React.FC<MarkdownProps> = ({ filepath }) => {
    const [contentHtml, setContentHtml] = useState(['']);
    useEffect(() => {
        const fetchMarkdown = async (file: string) => {
            const response = await fetch(`/text/${file}.md`);
            const text = await response.text();

            const paragraphs = text.split('<br>');
            const markdown = [];

            for (const paragraph of paragraphs) {
                const processedContent = await remark()
                    .use(html)
                    .process(paragraph);
                markdown.push(processedContent.toString());
                setContentHtml(markdown);
            }
        };

        fetchMarkdown(filepath);
    }, [setContentHtml, filepath]);

    return (
        <>
            {contentHtml.map((content, key) => {
                return (
                    <p
                        key={key}
                        dangerouslySetInnerHTML={{ __html: content }}
                        className="pt-2"
                    ></p>
                );
            })}
        </>
    );
};

export default Markdown;
