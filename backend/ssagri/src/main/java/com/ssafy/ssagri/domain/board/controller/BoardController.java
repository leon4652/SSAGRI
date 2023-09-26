package com.ssafy.ssagri.domain.board.controller;

import com.ssafy.ssagri.domain.board.dto.*;
import com.ssafy.ssagri.domain.board.service.BoardService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/board")
@RequiredArgsConstructor
@Api(tags = {"게시판에 대한 API"})
@CrossOrigin("*")
public class BoardController {

    final private BoardService boardService;

    // 조회수로 오름차순한 게시판이름이랑 조회수 출력
    @GetMapping("/click-board-list")
    @ApiOperation("조회수로 오름차순한 게시판이름이랑 조회수 출력")
    public List<BoardClickDto> boardClickList() {
        return boardService.boardClickList();
    }

    // 타이틀로 오름차순한 게시판 리스트출력
    @GetMapping("/title-board-list")
    @ApiOperation("이름으로 오름차순한 게시판 리스트출력")
    public List<BoardClickDto> boardTitleList() {
        return boardService.boardTitleList();
    }

    @GetMapping("/all-list")
    @ApiOperation("모든 게시판 출력")
    public Page<BoardDto> allList(Pageable pageable) {
        Page<BoardDto> BoardDtos = boardService.boardList(pageable);
        return BoardDtos;
    }

    // 게시판 등록
    @PostMapping(value = "/regist")
    @ApiOperation("게시판 등록")
    public void boardregist(@RequestBody BoardCreateDto boardCreateDto) {
        boardService.boardregist(boardCreateDto);

    }

    // 게시판에 글 쓰기
    @PostMapping(value = "/write")
    @ApiOperation("게시판에 글 쓰기")
    public void boardWrite(@RequestBody BoardWriteDto boardWriteDto) {
        boardService.boardWrite(boardWriteDto);

    }

    // 게시판 클릭시 조회수 증가
    @GetMapping(value = "/board/click/{boardNo}")
    @ApiOperation("게시판 클릭 시 조회수 증가")
    public void boardClick(@PathVariable("boardNo") Long boardNo){
        boardService.boardClick(boardNo);
    }


    // 모든 게시글 출력
    @GetMapping("/all-write-list")
    @ApiOperation("모든 게시글 출력")
    public Page<BoardListDto> allWriteList(Pageable pageable) {
        Page<BoardListDto> BoardListDtos = boardService.boardWriteList(pageable);
        return BoardListDtos;
    }

    // 게시글에 좋아요 누르기
    @GetMapping(value = "/write-like/{writeno}")
    @ApiOperation("게시글 좋아요 누르기")
    public void boardWriteLike(@PathVariable("writeno") Long writeNo){

    }

    // 생명 주기 제일 적은 게시판 Top3
    @GetMapping(value = "/board-life")
    @ApiOperation("생명 주기 제일 적은 게시판 Top3")
    public List<BoardDto> boardLifeTop3(){
        return boardService.boardLife();
    }



    // 하나의 게시글에 댓글달기
//    @PostMapping("/write/comment")
//    @ApiOperation("하나의 게시글에 댓글달기")
//    public





}
