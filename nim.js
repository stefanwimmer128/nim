/*
 * Copyright (c) 2016, Stefan Wimmer
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

/**
 * NIM
 * @author Stefan Wimmer <stefanwimmer128@gmail.com>
 * @date 29.07.16
 */

$(() =>
{
    const _rows = [ 7, 5, 3, 1 ];
    
    const createRows = (rows) =>
        rows.map(row =>
        {
            const cards = [];
            
            for (let i = 0; i < row; i++)
                cards.push(true);
            
            return cards;
        });
    
    let rows = createRows(_rows);
    
    let player = "You";
    
    let player_row = -1;
    
    let player_took = 0;
    
    const update = () =>
    {
        $("#nim").empty();
        
        rows.forEach((row, ir) =>
        {
            $("#nim").append("<p></p>");
            
            row.forEach((card, ic) =>
            {
                if (card)
                    $("#nim").children("p")
                        .last()
                        .append("<span></span>")
                        .children("span")
                        .last()
                        .click(() =>
                        {
                            if (player_row >= 0)
                                if (player_row !== ir)
                                    return ;
                            
                            player_row = ir;
                            
                            rows[ir][ic] = false;
                            
                            player_took++;
                            
                            update();
                            
                            hasWon(player);
                        });
            });
        });
    };
    
    const aiTurn = () =>
    {
        if (hasWon())
            return ;
        
        if (player_took === 0)
            return;
        
        $("#nextTurn").hide();
        
        whoTurn("AI");
        
        const row = Math.floor(Math.random() * rows.length);
        const cards = rows[row].filter(card => card);
        
        if (cards.length < 1)
            return aiTurn();
        
        const takes = Math.ceil(Math.random() * cards.length);
        
        let took = 0;
        
        rows[row] = rows[row].map(card =>
        {
            if (card)
                if (took <= takes)
                {
                    card = false;
                    took++;
                }
                
            return card;
        });
        
        player_row = -1;
        
        player_took = 0;
        
        update();
        
        if (hasWon("AI"))
            return ;
        
        whoTurn("You");
    };
    
    const hasWon = (who) =>
    {
        const won = rows.every(row =>
            row.every(card =>
                ! card
            )
        );
        
        if (won && typeof who !== "undefined")
        {
            $("#win").text(who + " won!");
            
            $("#whoTurn").empty();
        }
        
        return won;
    };
    
    const restart = () =>
    {
        rows = createRows(_rows);
        
        $("#win").empty();
        
        whoTurn("You / Player A");
        
        player_row = -1;
        
        player_took = 0;
        
        $("#aiTurn").show();
        $("#nextTurn").show();
        
        update();
    };
    
    const whoTurn = (who) =>
        $("#whoTurn").text(who + " turn");
    
    const nextTurn = () =>
    {
        if (player_took === 0)
            return ;
        
        $("#aiTurn").hide();
        
        if (player === "You" || player === "Player A")
            player = "Player B";
        else if (player === "Player B")
            player = "Player A";
        
        whoTurn(player);
        
        player_row = -1;
        
        player_took = 0;
    };
    
    $("#aiTurn").click(aiTurn);
    
    $("#nextTurn").click(nextTurn);
    
    $("#restart").click(restart);
    
    update();
    
    whoTurn("You / Player A");
});
