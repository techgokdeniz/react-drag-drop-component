import React, { useRef,useState } from 'react'
import "../styles/dropfile.scss"
import {ImageConfig} from '../config/ImageConfig'
import UploadImg from '../assets/cloud-upload-regular-240.png'
import PropTypes from 'prop-types';

const Dropfile = (props) => {

    const wrapperRef=useRef(null);

    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile=e.target.files[0];
        if(newFile){
            const updateList = [...fileList,newFile]
            setFileList(updateList);
            props.onFileChange(updateList)
        }
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    }


  return (
    <>
          <div ref={wrapperRef}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className='drop-file-input'>
              <div className="drop-file-input__label">
                  <img src={UploadImg} alt="" />
                  <p>Drag to Drop your files here</p>
              </div>
              <input type="file" value="" onChange={onFileDrop} />
          </div>
          {
              fileList.length > 0 ? (
                  <div className="drop-file-preview">
                      <p className="drop-file-preview__title">
                          Read to Upload
                      </p>
                      {
                          fileList.map((item,index)=>(
                              <div className="drop-file-preview__item">
                                  <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                  <div className="drop-file-preview__item__info">
                                      <p>{item.name}</p>
                                      <p>{item.size}B</p>
                                  </div>
                                  <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                              </div>
                          ))
                      }
                  </div>
              ) : null
          }
    </>
  )
}

Dropfile.propTypes = {
    onFileChange: PropTypes.func
}
export default Dropfile