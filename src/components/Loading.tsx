import React from 'react'


export const Loading = () => {
    return (
        <>
            < div className="custom-loader" ></div >
            <style jsx>
                {`
        
        
    .custom-loader {
        width: 80px;
        height: 80px;
        --c: linear-gradient(#5AA4F4 0 0);
        --r1: radial-gradient(farthest-side at bottom, #5AA4F4 93%, #0000);
        --r2: radial-gradient(farthest-side at top, #5AA4F4 93%, #0000);
        background:
            var(--c),
            var(--r1),
            var(--r2),
            var(--c),
            var(--r1),
            var(--r2),
            var(--c),
            var(--r1),
            var(--r2);
        background-repeat: no-repeat;
        animation: db2 1s infinite alternate;
    }

    @keyframes db2 {

        0%,
        25% {
            background-size: 16px 0, 16px 8px, 16px 8px, 16px 0, 16px 8px, 16px 8px, 16px 0, 16px 8px, 16px 8px;
            background-position: 0 50%, 0 calc(50% - 4px), 0 calc(50% + 4px), 50% 50%, 50% calc(50% - 4px), 50% calc(50% + 4px), 100% 50%, 100% calc(50% - 4px), 100% calc(50% + 4px);
        }

        50% {
            background-size: 16px 100%, 16px 8px, 16px 8px, 16px 0, 16px 8px, 16px 8px, 16px 0, 16px 8px, 16px 8px;
            background-position: 0 50%, 0 calc(0% - 4px), 0 calc(100% + 4px), 50% 50%, 50% calc(50% - 4px), 50% calc(50% + 4px), 100% 50%, 100% calc(50% - 4px), 100% calc(50% + 4px);
        }

        75% {
            background-size: 16px 100%, 16px 8px, 16px 8px, 16px 100%, 16px 8px, 16px 8px, 16px 0, 16px 8px, 16px 8px;
            background-position: 0 50%, 0 calc(0% - 4px), 0 calc(100% + 4px), 50% 50%, 50% calc(0% - 4px), 50% calc(100% + 4px), 100% 50%, 100% calc(50% - 4px), 100% calc(50% + 4px);
        }

        95%,
        100% {
            background-size: 16px 100%, 16px 8px, 16px 8px, 16px 100%, 16px 8px, 16px 8px, 16px 100%, 16px 8px, 16px 8px;
            background-position: 0 50%, 0 calc(0% - 4px), 0 calc(100% + 4px), 50% 50%, 50% calc(0% - 4px), 50% calc(100% + 4px), 100% 50%, 100% calc(0% - 4px), 100% calc(100% + 4px);
        }
    }

        `}
            </style>
        </>
    )
}
