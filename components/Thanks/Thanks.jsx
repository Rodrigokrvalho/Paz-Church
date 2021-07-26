import React from "react"
import logo from '../../public/logotop.png'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../src/styles/Thanks.module.css'

export default class Thanks extends React.Component {
    render() {
        return (
            <div className={styles.content}>
                <div>
                    <h3>Cadastro Finalizado</h3>
                    <Link href="/">
                        <a className={styles.button}>Voltar para Home</a>
                    </Link>
                </div>
            </div>
        )
    }
}