import React, { useState } from "react";

import close from './media/img/close.png';
import ci1 from './media/img/CI_1.png';
import ci2 from './media/img/CI_2.png';
import ci3 from './media/img/CI_3.png';
import ci4 from './media/img/CI_4.png';

function InfoPage(props) {
    const {
        hide,
        onHide
    } = props;

    return (
        <div className='info-page' style={{ top: hide ? '100%' : 0 }}>
            <img className='close-button' src={close} alt='close' onClick={() => onHide()}/>
            <div style={{ fontWeight: 'bold', fontSize: '20px', marginLeft: '20px', marginTop: '80px' }}>고마타 소개</div>
            <div style={{ fontSize: '14px', marginLeft: '20px', marginTop: '24px', marginRight: '20px' }}>
                안녕하세요.
                <br/>
                고마타 기획자 장우영 입니다.
                <br/>
                <br/>
                고마타(고양시 마을버스 타요)는 집 앞에서 마을버스 타고 편하게 지하철을 환승할 수 없을까라는 생각에서 기획하게 되었습니다.
            </div>
            <ul style={{ fontSize: '14px' }}>
                <li>마을버스는 왜 정류장 별로 시간표가 없을까?</li>
                <li>왜 우리집 마을버스는 맨날 "회차대기", "버스정보없음"일까?</li>
                <li>지금 마을버스를 타면 몇 시 지하철을 탈 수 있을까?</li>
            </ul>
            <div style={{ fontSize: '14px', marginLeft: '20px', marginTop: '24px', marginRight: '20px' }}>
                고마타에서 위 3가지 궁금증을 해결해보세요.
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '14px', marginLeft: '20px', marginTop: '40px' }}>담당자 연락처</div>
            <div style={{ fontSize: '14px', marginLeft: '20px', marginTop: '6px' }}>jangwy8838@gmail.com</div>
            <div style={{ fontSize: '14px', marginLeft: '20px', marginTop: '0px' }}>devhoonse@gmail.com</div>
            <div style={{ fontSize: '14px', marginLeft: '20px', marginTop: '0px' }}>tnstndusqlc@gmail.com</div>
            <div style={{ marginLeft: '20px', marginTop: '0px' }}>
                <div><img style={{ marginTop: '30px', height: '40px' }} alt='ci' src={ci1}/></div>
                <div><img style={{ marginTop: '30px', height: '40px' }} alt='ci' src={ci2}/></div>
                <div><img style={{ marginTop: '30px', height: '40px' }} alt='ci' src={ci3}/></div>
                <div><img style={{ marginTop: '30px', height: '40px', marginBottom: '30px' }} alt='ci' src={ci4}/></div>
            </div>
        </div>
    );
}

export default InfoPage;
