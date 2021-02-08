import { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';

const Loader = (props) => {
    const length = props.data.length;
    // const [allData, setAllData] = useState([]);



    // useEffect(() => {
    //     setAllData(props.data);
    // }, [props.data])

    // console.log(length)
    const loopArray = [0, 1, 2, 3, 4];
    const newLength = length - loopArray.length; // props length 10 - 5 = 5;

    // console.log('New Length', newLength);

    if (loopArray.length < length) {
        for (let i = 0; i < length; i++) {
            loopArray.push(i);
            console.log(i)
        }
    }

    // for (let i = 0; i < length; i++) {
    //     setAllData([...allData, i]);
    // }

    console.log(length)


    return (
        <>
            {
                Array(length).fill().map((item, index) => (
                    <div className="col-md-4" key={index}>
                        <ContentLoader
                            viewBox="0 0 450 400"
                            backgroundColor="#f0f0f0"
                            foregroundColor="#dedede"
                            {...props}
                        >
                            <rect x="43" y="304" rx="4" ry="4" width="271" height="9" />
                            <rect x="44" y="323" rx="3" ry="3" width="119" height="6" />
                            <rect x="42" y="77" rx="10" ry="10" width="388" height="217" />
                        </ContentLoader>
                    </div>
                ))
            }
        </>
    );
};

export default Loader;