package com.hansung.Aing.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
//@Table(name = "aggregate_score")
public class TotalScore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Float gra_score;

    @Column
    private Float cla_score;

    @Column
    private Float coh_score;

    @Column
    private Float voc_score;

    @Column
    private Float str_score;

    @Column(nullable = false)
    private Integer count = 0;


}
