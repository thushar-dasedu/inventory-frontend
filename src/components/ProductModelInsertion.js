import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../axios';
import './ProductModel.css';

const ProductModelInsertion = () => {
  // const { productId } = useParams();
  // const [errorMessage, setErrorMessage] = useState('');
  // const [productData, setProductData] = useState({
  //   productId: '',
  //   brandName: '',
  //   containSerialNumber: '',
  // });

  // const [modelData, setModelData] = useState({
  //   productId: productId,
  //   productModelName: '',
  //   unitPrice: '',
  //   tax: '',
  //   quantity: '',
  //   imageMadel: [],
  // });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await API.get(`/product/get-product-by/${productId}`, {
  //         headers: {
  //           Authorization: 'basic ' + btoa('smith:smith123'),
  //         },
  //       });
  //       setProductData(response.data);
  //     } catch (error) {
  //       setErrorMessage(error.response.data.message);
  //     }
  //   };
  //   fetchData();
  // }, [productId]);

  // const handleData = (e) => {
  //   setModelData({ ...modelData, [e.target.name]: e.target.value });
  // };

  // const onFileSelected = (event) => {
  //   if (event.target.files) {
  //      console.log(event.target.files)
  //       const filesArray = Array.from(event.target.files);
  //       setModelData({ ...modelData, imageMadel: filesArray });
  //       console.log(modelData);
  //     }
  // };

  // useEffect(() => {
  //   console.log("Model data updated:", modelData);
  // }, [modelData]);

 
  // const submitData = async (e) => {
  //   e.preventDefault();
  
    
  
  //   try {
  //     const product = {
  //       productId: modelData.productId,
  //       productModelName: modelData.productModelName,
  //       unitPrice: modelData.unitPrice,
  //       tax: modelData.tax,
  //       quantity: modelData.quantity,
  //     };
    
  //     const json = JSON.stringify({ product });
  //     const blob = new Blob([json], {
  //       type: "application/json"
  //     });

  //     const form = new FormData();
  //     form.append('product', blob);
      
  //     for (let i = 0; i < modelData.imageMadel.length; i++) {
  //       const file = modelData.imageMadel[i];
  //       form.append("image", file);
  //     }
  
  //     const response = await API.post('/pro-model/add-product-model', form, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  
  //     console.log('Model data added successfully:', response.data);
  //   } catch (error) {
  //     console.error('Error adding model data:', error);
  //   }
  // };
  

  // const { productId } = useParams();
  // const [errorMessage, setErrorMessage] = useState('');

  // const [productData, setProductData] = useState({
  //     productId: '',
  //     brandName: '',
  //     containSerialNumber: '',
  //   });
  //   const [product, setProduct] = useState({
  //     productId: '',
  //     productModelName: '',
  //     unitPrice: '',
  //     tax: '',
  //     quantity: ''
  //   });
  
  //   const [images, setImages] = useState([]);
  //   useEffect(() => {
  //       const fetchData = async () => {
  //         try {
  //           const response = await API.get(`/product/get-product-by/${productId}`, {
  //             headers: {
  //               Authorization: 'basic ' + btoa('smith:smith123'),
  //             },
  //           });
  //           setProductData(response.data);
  //         } catch (error) {
  //           setErrorMessage(error.response.data.message);
  //         }
  //       };
  //       fetchData();
  //     }, [productId]);

  //     const handleData = (e) => {
  //         setProduct({ ...product, [e.target.name]: e.target.value });
  //       };

  //       const onFileSelected = (e) => {
  //         setImages(e.target.files);
  //       };

  //       const submitData = async (e) => {
  //           e.preventDefault();
          
            
          
  //           try {
  //             const json = JSON.stringify( product );
  //                 const blob = new Blob([json], {
  //                   type: "application/json"
  //                 });
        
  //             const form = new FormData();
  //             form.append('product', blob);
              
  //             for (let i = 0; i < images.length; i++) {
  //               const file = images[i];
  //               form.append("image", file);
  //             }
          
  //             const response = await API.post('/pro-model/add-product-model', form, {
  //               headers: {
  //                 'Content-Type': 'multipart/form-data',
  //               },
  //             });
          
  //             console.log('Model data added successfully:', response.data);
  //           } catch (error) {
  //             console.error('Error adding model data:', error);
  //           }
  //         };



  const { productId } = useParams();
  const [errorMessage, setErrorMessage] = useState('');
  const [productData, setProductData] = useState({
    productId: '',
    brandName: '',
    containSerialNumber: '',
  });
  const [product, setProduct] = useState({
    productId: productId,
    productModelName: '',
    unitPrice: '',
    tax: '',
    quantity: ''
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`/product/get-product-by/${productId}`, {
          headers: {
            Authorization: 'basic ' + btoa('smith:smith123'),
          },
        });
        setProductData(response.data);
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    };
    fetchData();
  }, [productId]);

  const handleData = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onFileSelected = (e) => {
    const selectedFiles = e.target.files;
    setImages(selectedFiles);

    // Preview images
    const previews = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        previews.push(event.target.result);
        if (previews.length === selectedFiles.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(selectedFiles[i]);
    }
  };

  const submitData = async (e) => {
    e.preventDefault();
    
    try {
      const json = JSON.stringify( product );
      const blob = new Blob([json], {
        type: "application/json"
      });

      const form = new FormData();
      form.append('product', blob);
      
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        form.append("image", file);
      }
  
      const response = await API.post('/pro-model/add-product-model', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Model data added successfully:', response.data);
      setProduct({
        productId: '',
        productModelName: '',
        unitPrice: '',
        tax: '',
        quantity: ''
      });
      setImages([]);
      setImagePreviews([]);
    } catch (error) {
      console.error('Error adding model data:', error);
    }
  };
 


  return (
    <div className="model-section">
      <h1>Add Product Model</h1>
      <div className="model-detail">
        <div className="products">
          <form>
            <div className="mb-3">
              <label htmlFor="brandName" className="form-label">
                Brand Name
              </label>
              <input
                type="text"
                id="brandName"
                className="form-control"
                name="brandName"
                value={productData.brandName}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productModelName" className="form-label">
                Model Name
              </label>
              <input
                type="text"
                id="productModelName"
                className="form-control"
                name="productModelName"
                value={product.productModelName}
                onChange={handleData}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="unitPrice" className="form-label">
                Unit Price
              </label>
              <input
                type="number"
                id="unitPrice"
                className="form-control"
                name="unitPrice"
                value={product.unitPrice}
                onChange={handleData}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tax" className="form-label">
                Tax(%)
              </label>
              <input
                type="number"
                min="0"
                id="tax"
                className="form-control"
                name="tax"
                value={product.tax}
                onChange={handleData}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity
              </label>
              <input
                type="number"
                min="0"
                id="quantity"
                className="form-control"
                name="quantity"
                value={product.quantity}
                onChange={handleData}
              />
            </div>
            <button className="btn btn-primary" onClick={submitData}>
              Save
            </button>
            {errorMessage && <div className="error">{errorMessage}</div>}
          </form>
        </div>
        <div className="images">
          <div className="img-section">
            <input type="file" multiple onChange={onFileSelected} />
           
          </div>
          <div className="single-images">
              {imagePreviews.map((preview, index) => (
                <div className="image-list">
                <img key={index} src={preview} alt={`Image ${index}`} />
                </div>))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModelInsertion;
