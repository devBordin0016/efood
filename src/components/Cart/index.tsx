import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputMask from 'react-input-mask'

import {
  CartButton,
  CartButtonLink,
  CartContainer,
  CartMenu,
  CartStyle,
  ConfirmationMenu,
  DeliveryMenu,
  Foto,
  InputGroup,
  Overlay,
  PaymentMenu,
  RemoveButton,
  Total
} from './styles'
import { RootReducer } from '../../store'
import { formataPreco } from '../Product'

import removeImg from '../../assets/images/remove.svg'
import { close, remove } from '../../store/reducers/cart'
import { usePurchaseMutation } from '../../services/api'

const Cart = () => {
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart)
  const [menu, setMenu] = useState('cart')

  const dispatch = useDispatch()

  const [purchase, { isLoading, isError, data, isSuccess }] =
    usePurchaseMutation()

  const form = useFormik({
    initialValues: {
      receiver: '',
      address: '',
      city: '',
      zipCode: '',
      number: '',
      complement: '',
      cardName: '',
      cardNumber: '',
      cardCode: '',
      expiresMonth: '',
      expiresYear: ''
    },
    validationSchema: Yup.object({
      receiver: Yup.string()
        .min(5, 'O nome precisa ter pelo menos 5 letras')
        .required('Campo obrigatório'),
      address: Yup.string().required('Campo obrigatório'),
      city: Yup.string().required('Campo obrigatório'),
      zipCode: Yup.string()
        .min(9, 'O CEP precisa ter 8 números')
        .max(9, 'O CEP precisa ter 8 números')
        .required('Campo obrigatório'),
      number: Yup.string().required('Campo obrigatório'),
      cardName: Yup.string().when((values, schema) =>
        menu === 'payment' ? schema.required('Campo obrigatório') : schema
      ),
      cardNumber: Yup.string().when((values, schema) =>
        menu === 'payment' ? schema.required('Campo obrigatório') : schema
      ),
      expiresMonth: Yup.string().when((values, schema) =>
        menu === 'payment' ? schema.required('Campo obrigatório') : schema
      ),
      expiresYear: Yup.string().when((values, schema) =>
        menu === 'payment' ? schema.required('Campo obrigatório') : schema
      )
    }),
    onSubmit: (values) => {
      purchase({
        delivery: {
          receiver: values.receiver,
          address: {
            description: values.address,
            number: Number(values.number),
            city: values.city,
            zipCode: values.zipCode,
            complement: values.complement
          }
        },
        payment: {
          card: {
            name: values.cardName,
            number: Number(values.cardNumber),
            code: Number(values.cardCode),
            expires: {
              month: Number(values.expiresMonth),
              year: Number(values.expiresYear)
            }
          }
        },
        products: [
          {
            id: 1,
            price: 99
          }
        ]
      })
    }
  })

  const closeCart = () => {
    dispatch(close())
  }

  const removeProduct = (id: number) => {
    dispatch(remove(id))
  }

  const getTotalPrice = () => {
    return items.reduce((acc, curr) => {
      if ((acc += curr.preco)) {
        return (acc += curr.preco)
      }
      return 0
    }, 0)
  }

  const getError = (fieldName: string) => {
    const isTouched = fieldName in form.touched
    const isInvalid = fieldName in form.errors
    const hasError = isTouched && isInvalid

    return hasError
  }

  const handleNextMenu = async (nextMenu: string) => {
    await form.validateForm()

    if (form.isValid) {
      setMenu(nextMenu)
    } else {
      alert(
        'Preencha todos os campos obrigatórios corretamente para prosseguir'
      )
    }
  }

  console.log(form)

  return (
    <CartContainer className={isOpen ? 'is-open' : ''}>
      <Overlay onClick={closeCart}></Overlay>
      <CartStyle>
        {isSuccess ? (
          <ConfirmationMenu>
            <>
              <h3>Pedido realizado - {data?.orderId || 'ORDER_ID'}</h3>
              <p>
                Gostaríamos de ressaltar que nossos entregadores não estão
                autorizados a realizar cobranças extras.
              </p>
              <p>
                Lembre-se da importância de higienizar as mãos após o
                recebimento do pedido, garantindo assim sua segurança e
                bem-estar durante a refeição.
              </p>
              <p>
                Esperamos que desfrute de uma deliciosa e agradável experiência
                gastronômica. Bom apetite!
              </p>
            </>
            <CartButton>
              <CartButtonLink to={'/'} onClick={closeCart}>
                Concluir
              </CartButtonLink>
            </CartButton>
          </ConfirmationMenu>
        ) : (
          <form onSubmit={form.handleSubmit}>
            {menu === 'cart' && (
              <CartMenu>
                <ul>
                  {items.map((produto) => {
                    return (
                      <li key={produto.id}>
                        <Foto src={produto.foto} alt={produto.nome} />
                        <div>
                          <h3>{produto.nome}</h3>
                          <p>{formataPreco(produto.preco)}</p>
                        </div>
                        <RemoveButton onClick={() => removeProduct(produto.id)}>
                          <img
                            src={removeImg}
                            alt="Clique aqui para remover o produto do carrinho"
                          />
                        </RemoveButton>
                      </li>
                    )
                  })}
                </ul>
                <Total>
                  <p>Valor Total</p>
                  <p>{formataPreco(getTotalPrice())}</p>
                </Total>
                <CartButton
                  type="button"
                  onClick={() => {
                    if (items.length > 0) {
                      setMenu('delivery')
                    } else {
                      alert('Adicione produtos para prosseguir com a compra')
                    }
                  }}
                >
                  Continuar com a entrega
                </CartButton>
              </CartMenu>
            )}
            {menu === 'delivery' && (
              <DeliveryMenu>
                <h3>Entrega</h3>
                <div>
                  <InputGroup maxWidth="344px">
                    <label htmlFor="receiver">Quem irá receber</label>
                    <input
                      type="text"
                      id="receiver"
                      name="receiver"
                      value={form.values.receiver}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={getError('receiver') ? 'error' : ''}
                    />
                  </InputGroup>
                  <InputGroup maxWidth="344px">
                    <label htmlFor="address">Endereço</label>
                    <InputMask
                      mask="999.999.999-99"
                      type="text"
                      id="address"
                      name="address"
                      value={form.values.address}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={getError('address') ? 'error' : ''}
                    />
                  </InputGroup>
                  <InputGroup maxWidth="344px">
                    <label htmlFor="city">Cidade</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={form.values.city}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={getError('city') ? 'error' : ''}
                    />
                  </InputGroup>
                  <div>
                    <InputGroup maxWidth="155px">
                      <label htmlFor="zipCode">CEP</label>
                      <InputMask
                        mask="99999-999"
                        name="zipCode"
                        type="text"
                        value={form.values.zipCode}
                        id="zipCode"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={getError('zipCode') ? 'error' : ''}
                      />
                    </InputGroup>
                    <InputGroup maxWidth="155px">
                      <label htmlFor="number">Número</label>
                      <input
                        name="number"
                        type="text"
                        value={form.values.number}
                        id="number"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={getError('number') ? 'error' : ''}
                      />
                    </InputGroup>
                  </div>
                  <InputGroup maxWidth="344px">
                    <label htmlFor="complement">Complemento (opcional)</label>
                    <input
                      type="text"
                      id="complement"
                      name="complement"
                      value={form.values.complement}
                      onChange={form.handleChange}
                      className={getError('complement') ? 'error' : ''}
                    />
                  </InputGroup>
                </div>
                <CartButton
                  type="submit"
                  onClick={() => {
                    form.handleSubmit()
                    handleNextMenu('payment')
                  }}
                >
                  Continuar com o pagamento
                </CartButton>
                <CartButton
                  type="button"
                  onClick={() => {
                    setMenu('cart')
                  }}
                >
                  Voltar para o carrinho
                </CartButton>
              </DeliveryMenu>
            )}
            {menu === 'payment' && (
              <PaymentMenu>
                <h3>
                  Pagamento - Valor a pagar {formataPreco(getTotalPrice())}
                </h3>
                <div>
                  <InputGroup maxWidth="344px">
                    <label htmlFor="cardName">Nome no cartão</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={form.values.cardName}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={getError('cardName') ? 'error' : ''}
                    />
                  </InputGroup>
                  <InputGroup maxWidth="228px">
                    <label htmlFor="cardNumber">Número do cartão</label>
                    <InputMask
                      mask="9999 9999 9999 9999"
                      type="number"
                      id="cardNumber"
                      name="cardNumber"
                      value={form.values.cardNumber}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={getError('cardNumber') ? 'error' : ''}
                    />
                  </InputGroup>
                  <InputGroup maxWidth="87px">
                    <label htmlFor="cardCode">CVV</label>
                    <InputMask
                      mask="999"
                      type="number"
                      id="cardCode"
                      name="cardCode"
                      value={form.values.cardCode}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={getError('cardCode') ? 'error' : ''}
                    />
                  </InputGroup>
                  <InputGroup maxWidth="155px">
                    <label htmlFor="expiresMonth">Mês do vencimento</label>
                    <InputMask
                      mask="99"
                      type="number"
                      id="expiresMonth"
                      name="expiresMonth"
                      value={form.values.expiresMonth}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={getError('expiresMonth') ? 'error' : ''}
                    />
                  </InputGroup>
                  <InputGroup maxWidth="155px">
                    <label htmlFor="expiresYear">Ano do vencimento</label>
                    <InputMask
                      mask="99"
                      type="number"
                      id="expiresYear"
                      name="expiresYear"
                      value={form.values.expiresYear}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={getError('expiresYear') ? 'error' : ''}
                    />
                  </InputGroup>
                </div>
                <CartButton
                  type="submit"
                  onClick={() => {
                    form.handleSubmit()
                  }}
                >
                  Finalizar pagamento
                </CartButton>
                <CartButton
                  type="button"
                  onClick={() => {
                    setMenu('delivery')
                  }}
                >
                  Voltar para a edição de endereço
                </CartButton>
              </PaymentMenu>
            )}
          </form>
        )}
      </CartStyle>
    </CartContainer>
  )
}

export default Cart
